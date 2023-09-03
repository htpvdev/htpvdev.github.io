import { useState, useRef } from 'react'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Accordion, AccordionDetails, AccordionSummary, Button, List, ListItem, TextField, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

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
  const [foodList, setFoodList] = useState(initialFoodList)
  const [selectedFood, setSelectedFood] = useState('なんじゃろな?')
  const inputRef = useRef<HTMLInputElement>()

  const chooseFood = () => {
    const num = Math.floor(Math.random() * foodList.length)
    setSelectedFood(foodList[num])
  }

  const onClickDeleteButton = (food: string) => {
    setFoodList(foodList => foodList.filter(f => f !== food))
  }

  const addFood = () => {
    const newFood = inputRef.current?.value ?? 'エラー飯'
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setFoodList(foodList => [ ...foodList, newFood])
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
      <Divider />

      <TextField inputRef={inputRef} size='small' label="新規飯追加" variant="outlined" />
      <Button onClick={addFood} variant='contained'>追加</Button>

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
          <List>
            {foodList.map(food => {
              return (
                <ListItem divider key={food}>
                  <Typography sx={{ mr: 'auto' }}>{ food }</Typography>
                  <Button onClick={() => onClickDeleteButton(food)}><CloseIcon /></Button>
                </ListItem>
              )
            })}
          </List>
      </AccordionDetails>
    </Accordion>
    </Box>
  )
}

export default App
