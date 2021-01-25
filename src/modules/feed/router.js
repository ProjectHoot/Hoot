import Feed from "@/modules/feed/views/Feed";
import Post from "@/modules/feed/views/Post";
import PostShow from "@/views/PostShow";

export default [
  { path: "/", name: "Feed", component: Feed },
  { path: "/p/posts/:id", name: "Post", component: Post },
  {
    path: "/p/comments/:commentID",
    name: "PostShowExpandedComments",
    component: PostShow,
  },
];
