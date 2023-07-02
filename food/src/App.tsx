import { useState } from 'react'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const initialFoodList = [
  'ラーメン',
  'うどん',
  'そば',
  'ハンバーガー',
  '定食',
  '丼もの',
  'カツ',
  'カレー',
  'イタリアン',
  '中華',
  '韓国料理',
  '串',
  '鉄板',
  '寿司',
  '天ぷら',
  '肉系',
  'ファミレス',
  'オムライス',
  '鍋',
  'しゃぶしゃぶ',
]

function App() {
  const [foodList] = useState(initialFoodList)
  const [selectedFood, setSelectedFood] = useState('なんじゃろな?')

  const chooseFood = () => {
    const num = Math.floor(Math.random() * foodList.length)
    setSelectedFood(foodList[num])
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', alignContent: 'center' }}>
      <Typography>今日のご飯は</Typography>
      <Typography variant='h4'>「「 { selectedFood } 」」</Typography>
      { selectedFood !== 'なんじゃろな?' && (
        <Typography>で決まり！！！！</Typography>
      ) }
      <Button
        variant='contained'
        color='error'
        sx={{ my: 4 }}
        onClick={chooseFood}
      >
        ルーレットスタート
      </Button>
      <Accordion defaultExpanded sx={{ p: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>ルーレットの中身</Typography>
      </AccordionSummary>
      <AccordionDetails>
          <Divider />
          {foodList.map(food => {
            return <><Typography>{food}</Typography><Divider /></>
          })}
      </AccordionDetails>
    </Accordion>
    </Box>
  )
}

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataTable() {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

export default App
