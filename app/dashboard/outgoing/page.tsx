import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/schema';
import { cookies } from "next/headers";
import { NextPage } from 'next';
import OutgoingTable from './components/outgoing-table';

const Outgoing: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("outgoing_details")
    .select(`*,products(*,categories(*),suppliers(*)),stock_places(*)`)
    .order("outgoing_date", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  if (!data) return;

  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">出庫履歴</h1>
      <div className="mt-3 flex justify-center items center">
        <OutgoingTable outgoingDetails={data} />
      </div>
    </div>
  );
};

export default Outgoing;