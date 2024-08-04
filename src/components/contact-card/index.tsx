import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  TextField,
  Container
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/redux-hook';
import { selectContactById } from '@/store/contacts/selector';

const ContactCard = () => {
  const [tags, setTags] = useState<string[]>(['Tag1', 'Tag2', 'Tag3']);
  const [newTag, setNewTag] = useState('');
  
  const { id } = useParams<{ id: string }>();
  const contactsItem = useAppSelector(selectContactById(id));

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  if (!contactsItem) {
    return <Typography variant="h6">Contact not found</Typography>;
  }

  const { fields, avatar_url } = contactsItem;

  const firstName = fields['first name']?.[0]?.value || 'N/A';
  const lastName = fields['last name']?.[0]?.value || 'N/A';
  const email = fields.email?.[0]?.value || 'N/A';

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Card sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 100,
              height: 100,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40
            }}
            src={avatar_url}
          >
            {avatar_url ? null : (
              <Typography variant='h1' color='white'>
                {firstName[0]}
              </Typography>
            )}
          </Avatar>
          <Typography variant='h5'>
            {firstName} {lastName}
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            {email}
          </Typography>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Tags
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {tags.map((tag, index) => (
              <Chip key={index} label={tag} color='primary' />
            ))}
          </Box>
          <TextField
            label='Add new Tag'
            variant='outlined'
            size='small'
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            sx={{ mt: 2, width: '100%' }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleAddTag}
            sx={{ mt: 2, width: '100%' }}
          >
            Add Tag
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactCard;