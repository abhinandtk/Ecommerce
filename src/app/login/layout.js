import React from 'react'
import Header from '../components/Header'
import OfferSection from '../components/OfferSection'

export default function layout({children}) {
  return (
    <>
        {/* <OfferSection/> */}
      <Header/>
      {children}
    </>
  )
}
