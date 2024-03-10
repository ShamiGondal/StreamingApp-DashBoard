import React from 'react'

const DashPage = ({params}:{params:{dashboard:string[]}}) => {
  return (
    <div>
      {params.dashboard?.[0]}
    </div>
  )
}

export default DashPage
