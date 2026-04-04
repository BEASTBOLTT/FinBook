

const Dashboard = ({isAdmin}) => {
  return (
    <div className='bg-[#0A0A0A] border-l border-[#666B74] h-screen w-full'>
      <div className='flex'>
        <h1 className='text-white text-4xl font-bold m-3 w-fit'>Dashboard</h1>
        {
            isAdmin ? <button className='bg-[#D4AF37] absolute right-0 text-black px-3 py-1 rounded-lg m-5'>+ Add Transaction</button>:null
        }
      </div>
    </div>
  )
}

export default Dashboard
