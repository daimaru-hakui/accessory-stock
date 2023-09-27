import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/schema';
import { cookies } from "next/headers";
import { NextPage } from 'next';
import OrderHistoryTable from './components/order-history-table';

const OrderIndex: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("order_histories")
    .select(`*,products(*,categories(*),suppliers(*)),stock_places(*)`)
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  if (!data) return;

  console.log("incoming", data);

  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">入荷予定</h1>
      <div className="mt-3 flex justify-center items center">
        <OrderHistoryTable orders={data} />
      </div>
    </div>
  );
};

export default OrderIndex;