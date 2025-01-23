import PropTypes from 'prop-types';

function Pagination ({pageInfo, handlePageChange}){

    return(
        <div className="d-flex justify-content-center">
              <nav>
                <ul className="pagination">
                  <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`} >
                    <a className="page-link" onClick={(e)=>handlePageChange(e,pageInfo.current_page-1)} href="#">
                      上一頁
                    </a>
                  </li>
                  {
                    Array.from({ length: pageInfo.total_pages }).map((item,index)=>(
                      <li className={`page-item ${pageInfo.current_page === (index+1) && 'active'}`} key={index}>
                        <a className="page-link" onClick={(e)=>handlePageChange(e,index+1)} href="#">
                          {index+1}
                        </a>
                      </li>
                    ))
                  }
                  <li className={`page-item ${!pageInfo.has_next && 'disabled'}`}>
                    <a className="page-link " onClick={(e)=>handlePageChange(e,pageInfo.current_page+1)} href="#">
                      下一頁
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
    )
}

Pagination.propTypes = {
  pageInfo: PropTypes.shape({
    has_pre: PropTypes.bool.isRequired,
    has_next: PropTypes.bool.isRequired,
    current_page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
  }).isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;