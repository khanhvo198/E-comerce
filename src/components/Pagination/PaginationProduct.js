import {Pagination, PaginationItem, PaginationLink } from "reactstrap"



const PaginationProduct = ({totalProducts,paginate}) => {

    const pageNumber = []

    for(let i = 1; i <= Math.ceil(totalProducts/16); i++) {
        pageNumber.push(i)
    }
    

    return (
        <Pagination size="lg" >
            <PaginationItem>
                <PaginationLink first href="#"
                    onClick = {() => paginate(1)}
                ></PaginationLink>
            </PaginationItem>
            {/* <PaginationItem>
                <PaginationLink previous href="#"></PaginationLink>
            </PaginationItem> */}
            
            {
                pageNumber.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink
                            href="#"
                            onClick={() => paginate(number)}
                        >
                        {number}
                        </PaginationLink>
                    </PaginationItem>
                ))
            }

            {/* <PaginationItem>
                <PaginationLink next href="#">
                </PaginationLink>
            </PaginationItem> */}
            <PaginationItem>
                <PaginationLink last href="#"
                    onClick={() => paginate(pageNumber[pageNumber.length - 1])}
                >
                </PaginationLink>
            </PaginationItem>


        </Pagination>



    )

}


export default PaginationProduct