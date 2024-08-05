import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  TextField,
  Container,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { selectContactById } from "@/store/contacts/selector";
import { fetchContactById, updateContact } from "@/store/contacts/action";
import { CustomBtn } from "@/shared/ui-kit/button/CustomBtn";
import { mapperData } from "../../shared/helper/mapperData";

const ContactCard = () => {
  const [newTag, setNewTag] = useState("");
  const { id } = useParams<{ id: string }>();
  const contactsItem = useAppSelector(selectContactById(id));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!contactsItem) {
      dispatch(fetchContactById(id!));
    }
  }, [contactsItem, dispatch, id]);

  const mappedContact = useMemo(() => {
    return contactsItem ? mapperData(contactsItem) : null;
  }, [contactsItem]);

  const handleAddTag = () => {
    if (newTag.trim() && mappedContact) {
      const updatedTags = [...mappedContact.tags, newTag.trim()];
      dispatch(updateContact({ id: id!, tags: updatedTags }));
      setNewTag("");
    }
  };

  if (!mappedContact) {
    return <Typography variant="h6">Contact not found</Typography>;
  }

  const { email, firstName, lastName, avatar, tags } = mappedContact;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 100,
              height: 100,
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
            src={avatar}
          >
            {avatar ? null : (
              <Typography variant="h1" color="white">
                {firstName[0]}
              </Typography>
            )}
          </Avatar>
          <Typography variant="h5">
            {firstName} {lastName}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {email}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Tags
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {tags &&
              tags.map((tag, index) => (
                <Chip key={index} label={tag} color="primary" />
              ))}
          </Box>
          <TextField
            label="Add new Tag"
            variant="outlined"
            size="small"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
          />
          <CustomBtn onClick={handleAddTag}>Add Tag</CustomBtn>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactCard;