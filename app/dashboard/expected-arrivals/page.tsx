import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/schema';
import { cookies } from "next/headers";
import { NextPage } from 'next';
import OrderHistoryTable from './components/expected_arrival-table';

const ExpectedArrivalPage: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("order_details")
    .select(`*,products(*,
    categories(id,category_name),
    suppliers(id,supplier_name),
    skus(id,stock)),
    stock_places(id,stock_place_name)`)
    .gt("quantity",0)
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }
  if (!data) return;

  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">入荷予定</h1>
      <div className="mt-3 flex justify-center items center">
        <OrderHistoryTable orders={data} />
      </div>
    </div>
  );
};

export default ExpectedArrivalPage;
