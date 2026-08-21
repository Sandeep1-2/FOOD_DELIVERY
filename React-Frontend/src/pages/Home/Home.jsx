import React, { useState, useEffect } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import MenuList from '../../components/MenuList/MenuList'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = ({searchName,setSearchName}) => {
  const [category,setCategory]=useState("All");
  useEffect(() => {
    setSearchName("");
  }, [category]);
  return (
    <div>
      <Header/>
      <MenuList category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} searchName={searchName}/>
      <AppDownload/>
    </div>
  )
}

export default Home
