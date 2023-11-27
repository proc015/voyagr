export const ActivityMap = () => {
    // Markers will take either an address with correct format (e.g. '+' instead of whitespace) OR lat-lang nums
    const options = {
        markers: [],
        mapId: '',
        size: ''
    }


  return (
    <>
    <div className="div" style={{height: "290px", overflow: "hidden"}}>
      <img
        src={
          'https://maps.googleapis.com/maps/api/staticmap?&markers=Landala,Gothenburg|Majorna,Gothenburg|Berg,Sweden&size=300x300&key=AIzaSyA-Hi2FgH2KdyCeKTUNCy4BcExpre_suew&style=feature:poi|element:labels|visibility:off'
        }
      ></img>

    </div>
    </>
  );
};
