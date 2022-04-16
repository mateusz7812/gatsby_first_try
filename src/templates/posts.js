import React from "react";
import { graphql } from 'gatsby';
import Layout from "../layouts";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Disqus } from 'gatsby-plugin-disqus';

const PostPage = ({ data }) => {
    const post = data.markdownRemark;
    const image = getImage(post.frontmatter.image);
    return (
        <Layout>
            <div>
                <GatsbyImage image={image} alt={post.frontmatter.image} />
                <h1>{post.frontmatter.title}</h1>
                <h4 style={{color: 'rgb(165, 164, 164)'}}>{post.frontmatter.author} <span style={{fontSize: '0.8em'}}> -{post.frontmatter.date}</span></h4>
                <div dangerouslySetInnerHTML = {{ __html: post.html }}/>
            </div>
            <Disqus
                config={{
                    /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
                    identifier: post.fields.slug,
                    /* Replace PAGE_TITLE with the title of the page */
                }}
            />
        </Layout>
    );
};
export const query = graphql`
    query PostQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            fields{
                slug
            }
            frontmatter {
                title
                author
                date
                image {
                    childImageSharp {
                        gatsbyImageData(
                            height: 200
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                        )
                    }
                }
            }
        }
    }
`;
export default PostPage;