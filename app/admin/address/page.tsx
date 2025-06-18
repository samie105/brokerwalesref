import React from "react";
import AddressEdit from "@/components/admin/UserEdits/AddresssEdit";
import dbConnect from "@/server";
import Address, { PaymentAddress } from "@/server/addressSchema";

export default async function Page() {
  await dbConnect();

  const rawData = await Address.findOne({ name: "primeheritageglobal" });
  const data: PaymentAddress = JSON.parse(JSON.stringify(rawData));
  // console.log(data);

  return (
    <div>
      <AddressEdit data={data} />
    </div>
  );
}
