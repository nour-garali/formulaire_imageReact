import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Avatar, Modal } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import AvatarEditor from 'react-avatar-editor';

const Signup = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [editor, setEditor] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // Ajout de l'état pour la visibilité du modal

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSaveAvatar = (values) => {
    if (editor && avatar) {
      const canvas = editor.getImage();
      canvas.toBlob((blob) => {
        const data = new FormData();
        data.append('file', blob, avatar.name);
        data.append('firstName', values.firstName);
        data.append('lastName', values.lastName);
        data.append('email', values.email);
        data.append('password', values.password);

        fetch('http://127.0.0.1:5000/signup', {
          method: 'POST',
          body: data,
          headers: {}
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => console.error('Error:', error));
      }, 'image/jpeg');
    }
  };

  const handleAvatarClick = () => { // Ajout de la fonction pour gérer le clic sur l'avatar
    setIsVisible(true);
  };

  const handleCancel = () => { // Fonction pour annuler la modification de l'avatar
    setIsVisible(false);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Form form={form} onFinish={handleSaveAvatar}>
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <label htmlFor="avatar-upload">
            <Avatar src={avatar ? URL.createObjectURL(avatar) : "https://www.flaticon.com/svg/vstatic/svg/6700/6700065.svg?token=exp=1648048685~hmac=7e693618df94908c52ff0e4d3cf27161"} size={100} icon={<UserOutlined />} onClick={handleAvatarClick} />
          </label>
          <input id="avatar-upload" type="file" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
          {avatar && (
            <AvatarEditor
              ref={(e) => setEditor(e)}
              image={avatar}
              width={200}
              height={200}
              border={50}
              borderRadius={100}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <Modal open={isVisible} onClose={handleCancel}>
        <AvatarEditor
          ref={(e) => setEditor(e)}
          image={avatar}
          width={200}
          height={200}
          border={50}
          borderRadius={100}
        />
        <Button onClick={handleCancel}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default Signup;
