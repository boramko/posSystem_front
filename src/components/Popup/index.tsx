import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  List,
  ListItem,
  Typography,
  ListItemText,
  Collapse,
  Box,
  TextField
} from '@mui/material';
import { styled } from '@mui/system';
import CommonButton from 'components/Button';
import { PaymentDetails } from '../interface/POS_interface';


interface CommonDialogProps {
  open: boolean
  title: string
  onClose?: () => void
  children?: React.ReactNode
  loading?: boolean
  showCancelButton?: boolean
  showSaveButton?: boolean
  cancelButtonText?: string
  saveButtonText?: string
  cancelButtonColor?: string
  saveButtonColor?: string
  saveButtonSize?: string
  cancelButtonSize?: string
  onCancel?: () => void
  onSave?: () => void
  width?: string | number;
  height?: string | number;
  paymentDetails?: PaymentDetails;
}

const CommonDialog: React.FC<CommonDialogProps> = ({
  open,
  title,
  onClose,
  children,
  loading = false,
  showCancelButton = true,
  showSaveButton = true,
  cancelButtonText = '취소',
  saveButtonText = '확인',
  cancelButtonColor = 'red',
  saveButtonColor = 'blue',
  saveButtonSize = 'large',
  cancelButtonSize = 'large',
  width = 'auto',
  height = 'auto',
  paymentDetails,
  onSave = () => {}
}) => {
  const handleClose = () => {
    if (onClose) {
      console.log(paymentDetails)
      onClose()
    }
  }


  const NestedListItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: theme.spacing(4),
  }));

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width, height } }}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      {children}
      <List>
        {paymentDetails?.map((detail, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6">
                    <strong>{detail.menu.name}</strong> - {detail.menu.price}원 x {detail.quantity}
                  </Typography>
                }
              />
            </ListItem>
            {detail.selectedOptions && detail.selectedOptions.length > 0 && (
              <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {detail.selectedOptions.map((option, oIndex) => (
                    <NestedListItem key={oIndex}>
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            {option.option_name} - {option.option_price}원
                          </Typography>
                        }
                      />
                    </NestedListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </DialogContent>

      <DialogActions>
        {showCancelButton && (
          <CommonButton
            label={cancelButtonText}
            onClick={handleClose}
            variant={cancelButtonColor}
            size={cancelButtonSize}
            disabled={loading}
          />
        )}
        {showSaveButton &&  (
          <CommonButton
            label={saveButtonText}
            onClick={onSave}
            variant={saveButtonColor}
            size={saveButtonSize}
            disabled={loading}
          />
        )}
      </DialogActions>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 검은색 배경
            zIndex: 1000 // 다른 요소보다 앞에 표시
          }}
        >
          <CircularProgress size={50} />
        </Box>
      )}
    </Dialog>
  )
}

export default CommonDialog
