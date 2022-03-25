import { View, Text,ScrollView,Image} from 'react-native'
import React from 'react'
import ProductItem from '../../components/Shop/ProductItem'
import { useState,} from 'react'

const toolStore = () => {
    return ( 
    <ScrollView>
      <Text>toolStore</Text>
      <ProductItem
      src={'https://firebasestorage.googleapis.com/v0/b/graduated-project-ce605.appspot.com/o/Animals%2FblackPig2.png?alt=media&token=c5eaa148-6a09-4fd6-b6a4-4f7abc1ae8f0'}
      name={'가구1'}
      price={'20억'}
      />
      <ProductItem
      src={'https://image.newdaily.co.kr/site/data/img/2019/03/06/2019030600071_1.jpg'}
      name={'가구2'}
      price={'30억'}
      />
      <ProductItem
      src={'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F50e606b8f8ff41628b4440ca2a0017ef.jpg'}
      name={'가구3'}
      price={'40억'}
      />
    </ScrollView>
  )
}

export default toolStore
