import {Pagination, PaginationItem, PaginationLink } from "reactstrap"



const PaginationProduct = () => {
    return (
        <Pagination size="lg" >
            <PaginationItem>
                <PaginationLink first href="#"></PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#"></PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    1
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    2
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    3
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next href="#">
                </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#">
                </PaginationLink>
            </PaginationItem>


        </Pagination>



    )

}


export default PaginationProduct