"use client";

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SEND_MAIL } from "./apolloConfig/resolvers";

export default function Home() {
  const [input, setInputs] = useState({ to: "", subject: "", text: "", html: "" });
  const [sendMailMutation, { data, error, loading }] = useMutation(SEND_MAIL);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    sendMailMutation({
      variables: {
        input: {
          to: input.to,
          subject: input.subject,
          text: input.text,
          html: input.html,
        },
      },
    });
  };
  if(loading) return <>Email Gönderiliyor</>
  if(error) return <>Error</>
  return (
    <>
      <div className="text-center mt-5">
        <h1 className="text-2xl"> Nodemailer mini project </h1>
        <div className="w-full" style={{maxWidth:"35rem", margin:"auto"}}>
          <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="to"
              >
                To
              </label>
              <input
                onChange={handleChange}
                id="to"
                type="text"
                placeholder="To"
                name="to"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subject"
              >
                subject
              </label>
              <input
                onChange={handleChange}
                id="subject"
                type="text"
                placeholder="subject"
                name="subject"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="text"
              >
                text
              </label>
              <input
                onChange={handleChange}
                id="text"
                type="text"
                placeholder="text"
                name="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="html"
              >
                body
              </label>
              <input
                onChange={handleChange}
                id="html"
                type="text"
                placeholder="body"
                name="html"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send Email
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">Adnan Furkan AKTEMUR</p>
        </div>
      </div>
    </>
  );
}
