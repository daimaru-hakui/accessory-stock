"use client";
import Button from '@/app/components/ui/Button';
import React, { useState } from 'react';

const CsvUpload = () => {
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);
  const  [csvData,setCsvData] = useState<string[][]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUpload(e.target.files);
  };

  const onUploadCSV = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const fileReader = new FileReader();
    fileReader.onload = function () {
      if(!fileReader.result)  return
      setCsvData(fileReader?.result?.toString().split("\n").map((row)=>row.split(',')))
      }
    if(!fileUpload) return
    fileReader.readAsText(fileUpload[0]);
  };
console.log(csvData)

  return (
    <div className="w-full">
      <h1 className="font-bold text-lg">CSV-UPLOAD</h1>
      <div className="mt-3 flex justify-center items center">
        <input type='file' accept=".csv"
          onChange={handleChange} />
        <button onClick={onUploadCSV}>送信</button>
        {csvData}
      </div>
    </div>
  );
};

export default CsvUpload;