import React, { useState } from 'react';
import Link from 'gatsby-link'
import { graphql } from 'gatsby';
import './index.css'
import Layout from "../layouts"
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useFlexSearch } from 'react-use-flexsearch';
import SearchBar, { unFlattenResults } from '../components/Search';

const IndexPage = ({data}) => {
    console.log(data)
    const { search } = window.location;    
    const query = new URLSearchParams(search).get('s');    
    const [searchQuery, setSearchQuery] = useState(query || '');
    const results = useFlexSearch(searchQuery, data.localSearchPosts.index, data.localSearchPosts.store);
    const posts = searchQuery ? unFlattenResults(results) : data.allMarkdownRemark.edges.map(({node}) => node);
    return(
        <Layout>
            <SearchBar                
                searchQuery={searchQuery}                
                setSearchQuery={setSearchQuery}            
            />
            <div>
                {
                    posts.map(node => (
                        <div key={node.id} className="article-box">
                            <Link to={node.fields.slug} style={{textDecoration: 'none', color: 'inherit'}}>
                                <GatsbyImage image={getImage(node.frontmatter.image)} alt={node.frontmatter.image} />
                                <h3 className="title">{node.frontmatter.title}</h3>
                            </Link>
                            <p className="author">
                                Author: <i>{node.frontmatter.author}</i>
                            </p>
                            <p className="date">
                                {node.frontmatter.date} {node.timeToRead}min read
                            </p>
                            <p className="excerpt">
                                {node.excerpt}
                            </p>
                        </div>
                    ))
                }
            </div>
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
    query HomePageQuery{
        localSearchPosts {      
            index      
            store    
        }
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
            totalCount
            edges {
                node {
                    fields{
                        slug
                    }
                    frontmatter {
                        title
                        date
                        author
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    height: 100
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                    }
                    excerpt
                    timeToRead
                }
            }
        }
    }`