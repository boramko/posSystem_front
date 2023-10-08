import Avatar from 'components/Avatar'
import Board from 'components/Board'
import CommonButton from './Button'
import CommonDialog from './Popup'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'

const randoms = [
  [1, 2],
  [3, 4, 5],
  [6, 7]
]

const columns = [
  { field: 'id', headerName: '번호', width: 50, editable: false },
  {
    field: 'firstName',
    headerName: '성',
    width: 150,
    editable: false,
    isRequired: true
  },
  {
    field: 'lastName',
    headerName: '이름',
    width: 150,
    editable: true,
    isRequired: true
  },
  {
    field: 'age',
    headerName: '나이',
    type: 'number',
    width: 110,
    editable: true,
    isRequired: false
  }
]

const columns2 = [
  { field: 'id', headerName: '번호', width: 50, editable: false },
  {
    field: 'firstName',
    headerName: '성',
    width: 150,
    editable: false,
    isRequired: true
  },
  {
    field: 'lastName',
    headerName: '이름',
    width: 150,
    editable: true,
    isRequired: true
  },
  {
    field: 'age',
    headerName: '나이',
    type: 'number',
    width: 110,
    editable: true,
    isRequired: false
  }
]

const rows2 = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  {
    id: 9,
    lastName: 'Roxie',
    firstName: 'Harvey',
    age: 65,
    link: 'https://www.naver.com'
  }
]
const dataTtile = 'Sample Data Modify'

// eslint-disable-next-line react-hooks/rules-of-hooks

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <div className="my-4">
              <Avatar
                size="large"
                src="https://www.gravatar.com/avatar/4405735f6f3129e0286d9d43e7b460d0"
              />
            </div>
            <Board
              title={dataTtile}
              columnsData={columns}
              rows={rows}
              pageMaxrows={6}
              cancelButtonText="닫기"
              saveButtonText="저장하기"
              showCancelButton={true}
              showSaveButton={true}
              onSave={(data) => {
                alert(JSON.stringify(data))
                console.log(data)
              }}
            />
            <CommonButton
              label="테스트"
              onClick={() => {
                setOpen(true)
              }}
              variant="Black"
              size="large"
            ></CommonButton>
            <CommonDialog
              open={open}
              title={'test'}
              onSave={() => {
                console.log('OK')
                setOpen(false)
              }}
              loading={false}
              cancelButtonText={'cancelButtonText'}
              saveButtonText={'saveButtonText'}
              showCancelButton={true}
            >
              <TextField variant="outlined" fullWidth margin="normal" />
            </CommonDialog>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome!
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This is a boilerplate build with Vite, React 18, TypeScript,
              Vitest, Testing Library, TailwindCSS 3, Eslint and Prettier.
            </p>
          </div>
          <Board
            columnsData={columns2}
            rows={rows2}
            pageMaxrows={6}
            cancelButtonText="클로즈"
            saveButtonText="Save"
            showCancelButton={true}
            showSaveButton={true}
            cancelButtonColor="green"
            saveButtonColor="gray"
            saveButtonSize="12px"
            cancelButtonSize="12px"
            onSave={(data) => {
              alert(JSON.stringify(data))
              console.log(data)
            }}
          />
          <CommonButton
            label="글쓰기"
            onClick={() => {
              alert('test button')
            }}
            variant="primary"
            size="large"
          ></CommonButton>
          <div>
            <div className="my-10">
              <a
                href="vscode://"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
              >
                Start building for free
              </a>
              <div
                aria-hidden="true"
                className="pointer-events-none mt-10 md:mt-0 lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    {randoms.map((random, number) => (
                      <div
                        key={`random-${random[number]}`}
                        className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                      >
                        {random.map((number) => (
                          <div
                            key={`random-${number}`}
                            className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100"
                          >
                            <img
                              src={`https://picsum.photos/600?random=${number}`}
                              alt=""
                              className="h-full w-full bg-indigo-100 object-cover object-center"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
