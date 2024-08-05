import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

type ContactProps = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  tags: string[];
  id: string;
};

type ContactCardProps = {
  contact: ContactProps;
  handleDelete: (id: string) => void;
};

const ContactCardInfo: React.FC<ContactCardProps> = ({
  contact,
  handleDelete,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ margin: 2, position: "relative", bgcolor: "#EDEDED" }}
      onClick={() => navigate(`/contact/${contact.id}`)}
    >
      <CardContent sx={{ display: "flex" }}>
        <Avatar
          src={contact.avatar}
          sx={{ marginRight: 2, bgcolor: deepOrange[500] }}
        >
          {contact.firstName.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" component="div" color={"black"}>
            {contact.firstName} {contact.lastName}
          </Typography>
          <Typography variant="body2" color={"black"} sx={{ mt: 1 }}>
            {contact.email}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              color: "black",
              mt: 2,
              justifyContent: "start",
            }}
          >
            {contact.tags && contact.tags.length > 0 ? (
              contact.tags.map((tag, tagIndex) => (
                <Chip key={tagIndex} label={tag} />
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No tags available
              </Typography>
            )}
          </Box>
        </Box>

        <IconButton
          aria-label="delete"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(contact.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ContactCardInfo;
