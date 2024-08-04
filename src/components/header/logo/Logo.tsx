import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

import { feedOutlinedIcon } from "../headerStyles";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <>
      <Link to="/">
        <FeedOutlinedIcon sx={feedOutlinedIcon} />
      </Link>
    </>
  );
};
