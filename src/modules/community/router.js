import Communities from "./views/Communities";
import Feed from "@/modules/feed/views/Feed";

export default [
  { path: "/communities", name: "Communities", component: Communities },
  {
    path: "/c/:id/:name",
    name: "Community",
    component: Feed,
  },
];
