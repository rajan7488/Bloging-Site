import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../appWrite/config";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const crossPage=()=>{
        navigate('/')
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                {post.featuredImage ? (
                  <img
                   src={service.getFilePreview(post.featuredImage)}
                   alt={post.title}
                   className="rounded-xl"
                     />
) : (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
        No Image Available
    </div>
)}
<TiDeleteOutline className="w-8 h-8 cursor-pointer" onClick={crossPage}/>
                    {isAuthor && (
                        <div className="absolute right-16 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}