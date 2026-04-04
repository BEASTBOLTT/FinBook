
import { NavLink, } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='bg-[#0A0A0A] h-screen w-70 pt-10'>
          <NavLink to='/' className={({ isActive }) => isActive ? "text-white flex bg-[#111111] p-4 m-1 border-[#D4AF37] border rounded-2xl font-bold" : "text-[#666B74] flex font-bold p-2 m-1" }>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" ><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M19 11a2 2 0 0 1 1.995 1.85L21 13v6a2 2 0 0 1-1.85 1.995L19 21h-4a2 2 0 0 1-1.995-1.85L13 19v-6a2 2 0 0 1 1.85-1.995L15 11zM9 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zm10-2h-4v6h4zM9 17H5v2h4zM9 3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2H5v6h4zm10-2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2h-4v2h4z" /></g></svg>
              <h1 className="pl-2">DashBoard</h1>
        </NavLink>
          <NavLink to='/Insights' className={({ isActive }) => isActive ? "text-white flex bg-[#111111] p-4 m-1 border-[#D4AF37] border rounded-2xl font-bold" : "text-[#666B74] flex font-bold p-2 m-1"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048"><path fill="currentColor" d="M960 384q119 0 224 45t183 124t123 183t46 224q0 63-8 118t-25 105t-44 99t-64 100q-29 40-51 72t-36 64t-21 70t-7 89v179q0 40-15 75t-41 61t-61 41t-75 15H832q-40 0-75-15t-61-41t-41-61t-15-75v-180q0-51-7-88t-21-69t-36-65t-51-72q-37-51-63-99t-44-99t-26-106t-8-118q0-119 45-224t124-183t183-123t224-46m192 1472v-64H768v64q0 26 19 45t45 19h256q26 0 45-19t19-45m256-896q0-93-35-174t-96-143t-142-96t-175-35q-93 0-174 35t-143 96t-96 142t-35 175q0 89 18 153t47 114t61 94t61 92t48 108t21 143h384q1-83 20-142t48-108t61-92t61-94t47-115t19-153M960 256q-26 0-45-19t-19-45V64q0-26 19-45t45-19t45 19t19 45v128q0 26-19 45t-45 19M192 928H64q-26 0-45-19T0 864t19-45t45-19h128q26 0 45 19t19 45t-19 45t-45 19m53 261q26 0 45 19t19 46q0 20-11 35t-30 24q-11 5-30 13t-41 17t-40 15t-32 7q-26 0-45-19t-19-46q0-20 11-35t30-24q11-4 30-13t41-17t40-15t32-7m152-645q0 26-19 45t-45 19q-18 0-33-9l-109-67q-14-9-22-23t-9-32q0-26 19-45t45-19q16 0 33 10l110 66q14 8 22 23t8 32m83-368q0-26 19-45t45-19q17 0 32 9t24 24l62 112q8 14 8 30q0 27-19 46t-45 19q-17 0-32-9t-24-24l-62-112q-8-14-8-31m1376 624q26 0 45 19t19 45t-19 45t-45 19h-128q-26 0-45-19t-19-45t19-45t45-19zm2 501q0 26-19 45t-45 19q-11 0-30-6t-41-16t-40-17t-31-14q-18-8-29-24t-12-36q0-27 19-45t46-19q12 0 31 7t40 16t40 18t31 13q18 8 29 23t11 36m-271-693q-26 0-45-19t-19-45q0-17 8-32t22-23l110-66q17-10 33-10q26 0 45 19t19 45q0 17-8 31t-23 24l-109 67q-15 9-33 9m-337-321q0-16 8-30l62-112q8-15 23-24t33-9q26 0 45 19t19 45q0 17-8 31l-62 112q-8 15-23 24t-33 9q-26 0-45-19t-19-46" /></svg>
              <h1 className="pl-2">Insights</h1>
          </NavLink>
          <NavLink to='/transactions' className={({ isActive }) => isActive ? "text-white flex bg-[#111111] p-4 m-1 border-[#D4AF37] border rounded-2xl font-bold" : "text-[#666B74] flex font-bold p-2 m-1"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor"  d="M2 7h18m-4-5l5 5l-5 5m6 5H4m4-5l-5 5l5 5" /></svg>
              <h1 className="pl-2">Transactions</h1>
          </NavLink> 
    </div>
  )
}

export default Sidebar
