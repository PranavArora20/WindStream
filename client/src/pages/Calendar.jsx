import React, { useMemo } from "react";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "",
    search: "",
  });

  const tasksByDate = useMemo(() => {
    const map = {};
    (data?.tasks || []).forEach((t) => {
      const key = moment(t?.date).format("YYYY-MM-DD");
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    // sort dates ascending
    const entries = Object.entries(map).sort((a, b) =>
      a[0] > b[0] ? 1 : -1
    );
    return entries;
  }, [data]);

  if (isLoading) {
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold tracking-tight'>Schedule</h2>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='px-3 py-1.5 rounded-full text-sm bg-gray-200 hover:bg-gray-300 text-gray-800'
        >
          Back
        </button>
      </div>

      {tasksByDate.length === 0 ? (
        <p className='text-gray-600'>No tasks scheduled.</p>
      ) : (
        <div className='space-y-6'>
          {tasksByDate.map(([date, list]) => (
            <div key={date} className='bg-white rounded shadow p-4'>
              <div className='flex items-center justify-between mb-3'>
                <h3 className='text-lg font-semibold'>
                  {moment(date).format("ddd, MMM D, YYYY")}
                </h3>
                <span className='text-sm text-gray-500'>{list.length} task(s)</span>
              </div>
              <div className='divide-y'>
                {list
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((t) => (
                    <div key={t._id} className='py-2 flex items-center justify-between'>
                      <div>
                        <p className='font-medium'>{t.title}</p>
                        <p className='text-xs text-gray-500 capitalize'>
                          {t.stage} • {t.priority} priority
                        </p>
                      </div>
                      <span className='text-sm text-gray-500'>
                        {moment(t.date).format("hh:mm A")}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;


