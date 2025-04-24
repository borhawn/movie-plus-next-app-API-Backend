
import CategoryGrid from "../components/categoryGrid";

export default async function Categories({searchParams}:any) {
  const page = Number(searchParams.page);

  return (
    <>
      <CategoryGrid page={page}></CategoryGrid>
    </>
  );
}
