import { redirect } from "next/navigation";
import { signout } from "./lib/actions";
import { supabase } from "./lib/supabase";

export default async function Home() {
  const products_table = await supabase
    .from("products")
    .select()
    .order("id", { ascending: true });
  const products = products_table.data;

  const session = await supabase.auth.getSession()
  if(!session.data.session){
    redirect("/login")
  }
  console.log(session)

  return (
    <div>
      welcome{" "}
      <form action={signout}>
        <button>signout</button>
      </form>
      <div>
        {products &&
          products.length > 0 &&
          products.map((p, ind) => <div key={ind}>{p.name}</div>)}
      </div>
    </div>
  );
}
