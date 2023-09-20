import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
const Get = (req:NextApiRequest, res:NextApiResponse) => {
    try {
        return res.status(200).json({ message: "送信成功", name: req.body.name });
    } catch (error) {
        return res.status(400).json({ message: "送信失敗" });
    }
};

export default Get;