import PropTypes from 'prop-types';

import React, { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onVerify: PropTypes.func,
  onLock: PropTypes.func,
  isActivated: PropTypes.bool,
  isLocked: PropTypes.bool
};

export default function UserMoreMenu({ onDelete, onEdit, onVerify, onLock, isVerify, isLocked }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {!isVerify ? (
          <MenuItem onClick={() => {
            onVerify()
            setIsOpen(false)
          }} sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Iconify icon="eva:close-circle-outline" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Verifizieren" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ) : (
          <div>
            {isLocked ? (
              <MenuItem onClick={() => {
                onLock(!isLocked)
                setIsOpen(false)
              }} sx={{ color: 'text.secondary' }}>
                <ListItemIcon>
                  <Iconify icon="eva:unlock-outline" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Entsperren" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
            ) : (
              <MenuItem onClick={() => {
                onLock(!isLocked)
                setIsOpen(false)
              }} sx={{ color: 'text.secondary' }}>
                <ListItemIcon>
                  <Iconify icon="eva:lock-fill" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Sperren" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
            )}
          </div>
        )}
        <MenuItem onClick={() => {
          onEdit()
          setIsOpen(false)
        }} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Bearbeiten" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={() => {
          onDelete()
          setIsOpen(false)
        }} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Entfernen" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
