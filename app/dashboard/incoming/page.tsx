import React from 'react';
import IncomingTable from './components/incoming-table';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/schema';
import { cookies } from "next/headers";
import { NextPage } from 'next';

const Incoming: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("incoming_details")
    .select(`*,order_details(*,products(*,categories(*),suppliers(*))),stock_places(*)`)
    .order("created_at", { ascending: false })
    .order("incoming_date", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  if (!data) return;

  console.log("incoming", data);

  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">入荷履歴</h1>
      <div className="mt-3 flex justify-center items center">
        <IncomingTable incomingDetails={data} />
      </div>
    </div>
  );
};

export default Incoming;