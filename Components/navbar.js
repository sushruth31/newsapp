import axios from "axios";
import useSWR from "swr";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import { useRouter } from "next/router";

export default function () {
  async function fetcher(url) {
    let res = await axios.get(url);
    return res.data;
  }

  let router = useRouter();

  let { data } = useSWR("/api/topics", fetcher, { suspense: true });

  function Item({ topic }) {
    return (
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem onClick={() => router.push(`/category/${topic}`)} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={topic} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    );
  }

  return (
    <>
      <div className="flex flex-col w-56 bg-gray-300 h-screen fixed">
        <div className="w-full flex h-16 items-center mt-1 justify-center">
          <input onClick={() => router.push("/search")} className="rounded w-11/12" placeholder="Search" />
        </div>
        <div className="ml-2 text-gray-500">Topics</div>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent" }}>
          {data.map(topic => (
            <Item key={topic} topic={topic} />
          ))}
        </Box>
      </div>
    </>
  );
}
