import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  IconButton,
  Avatar,
  Chip
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useContacts } from '@/hooks/useContacts';
import { setContact } from '@/store/contacts/slice';
import type { Contact } from '@/types';

export const Main = () => {
  const { loadContacts, contacts, status, removeContact } = useContacts();
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!status && contacts.length === 0) {
      loadContacts();
    }
  }, [status, contacts.length, loadContacts]);

  const handleDelete = (id: string) => {
    removeContact(id);
  };

  const handleSubmit = () => {
    if (!newContact.firstName || !newContact.lastName || !newContact.email) {
      setValidationError('All fields are required');
      return;
    }

    setValidationError('');

    const formattedContact: Contact = {
      id: new Date().toISOString(),
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      avatar_url: '',
      tags2: [],
      fields: {
        'first name': [{ value: newContact.firstName }],
        'last name': [{ value: newContact.lastName }],
        email: [{ value: newContact.email }]
      }
    };

    dispatch(setContact(formattedContact));
    setNewContact({ firstName: '', lastName: '', email: '' });
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
      <Container sx={{ display: 'flex', flexDirection: 'column', flex: 1.7, gap: 4 }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          Create Contacts
        </Typography>
        {validationError && (
          <Typography color='error' variant='body1'>
            {validationError}
          </Typography>
        )}
        <TextField
          label='First Name'
          value={newContact.firstName}
          onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
        />
        <TextField
          label='Last Name'
          value={newContact.lastName}
          onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
        />
        <TextField
          label='Email'
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <Button onClick={handleSubmit}>Add Contact</Button>
      </Container>
      <Container sx={{ display: 'flex', flexDirection: 'column', flex: 3 }}>
        <Typography
          sx={{ fontSize: '20px', fontWeight: 'bold', paddingLeft: '16px' }}
          variant='h5'
          gutterBottom
        >
          Contacts
        </Typography>
        {contacts.map((contact, index) => {
          if (!contact || !contact.fields) {
            return (
              <Card key={index} sx={{ position: 'relative', bgcolor: '#EDEDED' }}>
                <CardContent sx={{ display: 'flex' }}>
                  <Avatar sx={{ marginRight: 2, bgcolor: deepOrange[500] }}>N/A</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant='h5' component='div' color={'black'}>
                      No information available
                    </Typography>
                    <Typography variant='body2' color={'black'} sx={{ mt: 1 }}>
                      No email
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        color: 'black',
                        mt: 2,
                        justifyContent: 'start'
                      }}
                    >
                      <Typography variant='body2' color='textSecondary'>
                        No tags available
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    aria-label='delete'
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => handleDelete(contact?.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            );
          }

          const firstName = contact.fields['first name']?.[0]?.value || 'N/A';
          const lastName = contact.fields['last name']?.[0]?.value || 'N/A';
          const email = contact.fields.email?.[0]?.value || 'N/A';

          return (
            <Card
              key={contact.id || index}
              sx={{ margin: 2, position: 'relative', bgcolor: '#EDEDED' }}
              onClick={() => navigate(`/contact/${contact.id}`)} // Переход на страницу контакта
            >
              <CardContent sx={{ display: 'flex' }}>
                <Avatar
                  src={contact.avatar_url}
                  sx={{ marginRight: 2, bgcolor: deepOrange[500] }}
                >
                  {firstName.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant='h5' component='div' color={'black'}>
                    {firstName} {lastName}
                  </Typography>
                  <Typography variant='body2' color={'black'} sx={{ mt: 1 }}>
                    {email}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      color: 'black',
                      mt: 2,
                      justifyContent: 'start'
                    }}
                  >
                    {contact.tags2 && contact.tags2.length > 0 ? (
                      contact.tags2.map((tag, tagIndex) => (
                        <Chip key={tagIndex} label={tag} />
                      ))
                    ) : (
                      <Typography variant='body2' color='textSecondary'>
                        No tags available
                      </Typography>
                    )}
                  </Box>
                </Box>
                <IconButton
                  aria-label='delete'
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                  onClick={() => handleDelete(contact.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </Container>
  );
};
