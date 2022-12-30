import { useSession } from 'next-auth/react';
import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile(props) {

  const { data: session } = useSession()
  const items = useSelector(state => state.cart.items)

  return (
    <div>Profile Page</div>
  )
}

export async function getServerSideProps() {

  return {
    props: {},
  };
}