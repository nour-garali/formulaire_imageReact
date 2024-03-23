import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UpdateUser.css';
import { Form, Input, Button, Avatar, Modal } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const UpdateUser = () => {
  const { id } = useParams();
  const history = useHistory();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profile_image: ''
  });
  const [newAvatar, setNewAvatar] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const userData = history.location.state?.user;
    if (userData) {
      setUser(userData);
    } else {
      fetch(`http://127.0.0.1:5000/users/${id}`)
        .then(response => response.json())
        .then(data => {
          setUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            profile_image: data.profile_image
          });
        })
        .catch(error => console.error('Erreur :', error));
    }
  }, [id, history]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('file', newAvatar); // Ajoutez le nouveau fichier d'image s'il y en a un
    formData.append('user', JSON.stringify(user)); // Ajoutez les données de l'utilisateur
    
    fetch(`http://127.0.0.1:5000/users/${id}/profile-image`, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Erreur :', error));
  };
  

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarClick = () => {
    setIsModalVisible(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);
    setIsModalVisible(false);
    setPreviewImage(URL.createObjectURL(file)); // Met à jour l'URL de l'aperçu de l'image
  };

  return (
    <div className="update-user-container">
      <h2>Modifier l'utilisateur</h2>
      <Avatar src={previewImage || `http://127.0.0.1:5000/static/uploads/${user.profile_image}`} size={100} icon={<UserOutlined />} onClick={handleAvatarClick} />
      <form>
        <div className="form-group">
          <label htmlFor="firstName">Prénom :</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Nom :</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <Button
          type="primary"
          onClick={() => {
            handleUpdate();
            history.push('/UserList');
          }}
        >
          Mettre à jour l'utilisateur
        </Button>
      </form>
      <Modal
        title="Choisir une nouvelle photo de profil"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <input type="file" onChange={handleAvatarChange} accept="image/*" />
      </Modal>
    </div>
  );
};

export default UpdateUser;
