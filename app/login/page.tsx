import { redirect } from "next/navigation";
import { signin } from "../lib/actions";
import { supabase } from "../lib/supabase";

export default async function Page(){
  const session = await supabase.auth.getSession()
  if(session.data.session){
    redirect("/")
  }
  console.log(session)
  return (
    <div>
      <form action={signin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-1 border-black"
          />
        </div>
        <div>
          <label htmlFor="pass">Pass:</label>
          <input
            type="password"
            name="pass"
            id="pass"
            className="border-1 border-black"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
