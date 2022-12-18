import useStaffTable from './hooks/useStaffTable';
import StaffTable from './StaffTable';

const Staffs = () => {
	const { columns, data } = useStaffTable();
	return (
		<>
			<StaffTable columns={columns} data={data} />
		</>
	);
};

export default Staffs;
