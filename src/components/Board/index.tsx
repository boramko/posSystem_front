import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { Search } from '@mui/icons-material'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CommonDialog from 'components/Popup'

interface CustomColDef {
  isRequired?: boolean
}
type ExtendedColDef = GridColDef & CustomColDef

interface BoardProps {
  title?: string
  columnsData: ExtendedColDef[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: readonly any[]
  pageMaxrows: number
  showCancelButton?: boolean
  showSaveButton?: boolean
  cancelButtonText?: string
  saveButtonText?: string
  cancelButtonColor?: string
  saveButtonColor?: string
  saveButtonSize?: string
  cancelButtonSize?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (data: any) => void
}

const Board: React.FC<BoardProps> = ({
  title = '',
  columnsData,
  rows,
  pageMaxrows,
  showCancelButton,
  showSaveButton,
  cancelButtonText,
  saveButtonText,
  cancelButtonColor,
  saveButtonColor,
  saveButtonSize,
  cancelButtonSize,
  onSave
}) => {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedRow, setSelectedRow] = useState<any | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editedData, setEditedData] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredRows, setFilteredRows] = useState(rows)
  const [loading, setLoading] = useState(false) // 로딩 상태 추가

  useEffect(() => {
    if (searchTerm) {
      setFilteredRows(
        rows.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      )
    } else {
      setFilteredRows(rows)
    }
  }, [searchTerm, rows])

  const handleRowClick = (param: GridRowParams) => {
    if (!param.row.link) {
      if(param.row.paymentDetails != undefined){
        try {
          console.log('Setting selected row:', selectedRow);
          setSelectedRow(JSON.parse(param.row.paymentDetails))
        } catch (error) {
          console.error("Error parsing paymentDetails:", error)
          setSelectedRow(param.row)  // or handle error in some other way
        }
      }else{
        setSelectedRow(param.row)
      }
      setEditedData(param.row)
      setOpen(true)
      console.log('Setting selected row end :', selectedRow);
    } else {
      window.location.href = param.row.link
    }
  }


  useEffect(() => {
    console.log('Component rendered with selectedRow:', selectedRow);
  }, [selectedRow]);

  
  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = async () => {
    setLoading(true) // 로딩 시작
    console.log(selectedRow)
    if (onSave) {
      await onSave(editedData)
    }
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 1000)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setEditedData((prevData: any) => ({
      ...prevData,
      [field]: value
    }))
  }

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <TextField
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
      <DataGrid
        rows={filteredRows}
        columns={columnsData}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageMaxrows
            }
          }
        }}
        pageSizeOptions={[pageMaxrows]}
        // checkboxSelection
        disableRowSelectionOnClick
        sortingOrder={['asc', 'desc']}
        filterMode="server"
      />

      <CommonDialog
        open={open}
        title={title}
        onClose={handleClose}
        onSave={handleSave}
        loading={loading}
        cancelButtonText={cancelButtonText}
        saveButtonText={saveButtonText}
        showCancelButton={showCancelButton}
        showSaveButton={showSaveButton}
        cancelButtonColor={cancelButtonColor}
        cancelButtonSize={cancelButtonSize}
        saveButtonColor={saveButtonColor}
        saveButtonSize={saveButtonSize}
        paymentDetails={selectedRow} // 여기에서 paymentDetails를 전달합니다.
      >
        {columnsData.map((column) => (
          <TextField
            key={column.field}
            label={column.headerName}
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedData?.[column.field] || ''}
            onChange={(e) => handleInputChange(column.field, e.target.value)}
            required={column.isRequired}
            type={column.type}
          />
        ))}
      </CommonDialog>
    </Box>
  )
}

export default Board
