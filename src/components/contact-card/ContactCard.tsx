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
  CircularProgress,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { selectContactById } from "@/store/contacts/selector";
import { fetchContactById, updateContact } from "@/store/contacts/action";
import { CustomBtn } from "@/shared/ui-kit/button/CustomBtn";
import { mapperData } from "../../shared/utils/mapperData";
import { useContacts } from "@/hooks/useContacts";

const ContactItem = () => {
  const [newTag, setNewTag] = useState("");
  const { id } = useParams<{ id: string }>();
  const contactsItem = useAppSelector(selectContactById(id!));
  const dispatch = useAppDispatch();
  const { status } = useContacts();

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

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
      }}
    >
      {status.fetchContactById ? (
        <CircularProgress />
      ) : mappedContact ? (
        <Card
          sx={{
            margin: 2,
            display: "flex",
            border: "1px solid #A6A6A6",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "white",
            padding: 5,
            borderRadius: 4,
            boxShadow: 5,
            width: "50%",
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: "83px",
                  height: "83px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
                src={mappedContact.avatar}
              >
                {!mappedContact.avatar && (
                  <Typography variant="h1" color="white">
                    {mappedContact.firstName[0]}
                  </Typography>
                )}
              </Avatar>
              <Box>
                <Typography variant="h5" color="black">
                  {mappedContact.firstName} {mappedContact.lastName}
                </Typography>
                <Typography variant="body1" color="black">
                  {mappedContact.email}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ pt: 2, pb: 1 }}>
                Tags
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  pb: 3,
                  borderRadius: 1,
                  width: "100%",
                }}
              >
                {mappedContact.tags.length > 0 ? (
                  mappedContact.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{
                        bgcolor: "#A6A6A6",
                        color: "black",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No tags available
                  </Typography>
                )}
              </Box>
              <TextField
                label="Add new Tag"
                variant="outlined"
                size="small"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                sx={{ width: "100%" }}
              />
              <CustomBtn onClick={handleAddTag}>Add Tag</CustomBtn>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6">Contact not found</Typography>
      )}
    </Container>
  );
};

export default ContactItem;
