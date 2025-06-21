import { useFetchActivities } from "../../hooks/useFetchActivities";

const ActivitiesList = () => {
  const { data, isLoading, error } = useFetchActivities();

  if (isLoading) {
    return <div className="text-center py-10">Loading activities...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center py-10">Error loading activities</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
      {data?.activities?.map((activity) => (
        <div key={activity._id} className="bg-white rounded-2xl shadow overflow-hidden">
          <img src={activity.imageUrl} alt={activity.name} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{activity.name}</h3>
            <p className="text-gray-600">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesList;
