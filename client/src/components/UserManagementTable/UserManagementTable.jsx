import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { Edit, Delete, Visibility, VerifiedUser } from '@mui/icons-material';

const UserManagementTable = () => {
  // In a real app, this would come from an API
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'trader', status: 'active', lastLogin: '2023-05-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'expert', status: 'active', lastLogin: '2023-05-14' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '2023-05-15' },
    { id: 4, name: 'New Trader', email: 'new@example.com', role: 'trader', status: 'pending', lastLogin: 'Never' },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'expert': return 'warning';
      default: return 'primary';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip 
                  label={user.role} 
                  color={getRoleColor(user.role)} 
                  size="small" 
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={user.status} 
                  color={getStatusColor(user.status)} 
                  size="small" 
                />
              </TableCell>
              <TableCell>{user.lastLogin}</TableCell>
              <TableCell>
                <Tooltip title="View">
                  <IconButton size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
                {user.role === 'expert' && (
                  <Tooltip title="Verify Expert">
                    <IconButton size="small">
                      <VerifiedUser fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserManagementTable;