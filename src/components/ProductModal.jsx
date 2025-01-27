import PropTypes from 'prop-types';


function ProductModal ({modalType, closeModal, selectedProduct, handleFileChange, handleModalInputChange, handleAddImage, handleRemoveImage, deleteProduct, updateProduct,handleImageChange,productModalRef}) {


    return(
        <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" ref={productModalRef} aria-hidden="true">
            <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className={`modal-header ${modalType === 'delete'? 'bg-danger' : 'bg-warning'} text-white`}>
                <h5 className="modal-title" id="productModalLabel">
                    <span>
                    {
                        modalType === 'delete'?'刪除產品':
                        modalType === 'edit'?'編輯產品':
                        '新增產品'
                    }
                    </span>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                {
                    modalType === 'delete'?(
                    <p className='h4'>確定要刪除
                        <span className='text-danger'>{selectedProduct.title}</span>
                        嗎？
                    </p>
                    ):(
                    <div className="row">
                        <div className="col-4">
                        <div className="mb-2">
                            <div className='mb-3'>
                            <div className="mb-3">
                                <label htmlFor="fileInput" className="form-label"> 圖片上傳 </label>
                                <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                className="form-control"
                                id="fileInput"
                                onChange={handleFileChange}
                                />
                            </div>
                            <label htmlFor="imageUrl" className='form-label'>請輸入圖片網址</label>
                            <input type="text" className='form-control' id='imageUrl' placeholder='請輸入圖片連結' value={selectedProduct.imageUrl} onChange={handleModalInputChange}/>
                            </div>
                            <img src={selectedProduct.imageUrl} className='img-fluid' alt="主圖" />
                        </div>
                        <div>
                            {selectedProduct.imagesUrl.map((imgUrl,index) => (
                            <div className='mb-2' key={index}>
                                <input type="text" className='mb-2 form-control' value={imgUrl} onChange={(e)=>handleImageChange(index,e.target.value)}/>
                                {imgUrl && (<img src={imgUrl} className='mb-2 img-preview custom-images' alt={`附圖${index+1}`} />)}
                            </div>
                            ))}
                            <div className="d-flex justify-content-between">
                            {
                                selectedProduct.imagesUrl.length < 5 && 
                                selectedProduct.imagesUrl[selectedProduct.imagesUrl.length-1] !== '' && 
                                (<button className='btn btn-warning btn-sm' onClick={handleAddImage}>新增圖片</button>)
                            }

                            {
                                selectedProduct.imagesUrl.length >=1 && 
                                (<button className='btn btn-danger btn-sm' onClick={handleRemoveImage}>取消圖片</button>)
                            }
                            </div>
                        </div>
                        </div>
                        <div className="col-8">
                        <div className="row">
                            <div className="mb-3 col-6">
                            <label htmlFor="title" className='form-label'>標題</label>
                            <input type="text" placeholder='請輸入標題' className='form-control' id='title' value={selectedProduct.title} onChange={handleModalInputChange}/>
                            </div>
                            <div className="mb-3 col-6">
                            <label htmlFor="category" className='form-label'>分類</label>
                            <input type="text" placeholder='請輸入分類' className='form-control' id='category' value={selectedProduct.category} onChange={handleModalInputChange}/>
                            </div>
                            <div className="mb-3 col-6">
                            <label htmlFor="num" className='form-label'>數量</label>
                            <input type="number" placeholder='請輸入數量' className='form-control' id='num' value={selectedProduct.num} onChange={handleModalInputChange} min='0'/>
                            </div>
                            <div className="mb-3 col-6">
                            <label htmlFor="unit" className='form-label'>單位</label>
                            <input type="text" placeholder='請輸入單位' className='form-control' id='unit' value={selectedProduct.unit} onChange={handleModalInputChange}/>
                            </div>
                            <div className="mb-3 col-6">
                            <label htmlFor="originPrice" className='form-label'>原價</label>
                            <input type="number" placeholder='請輸入原價' className='form-control' id='originPrice' value={selectedProduct.originPrice} onChange={handleModalInputChange} min='0' />
                            </div>
                            <div className="mb-3 col-6">
                            <label htmlFor="price" className='form-label'>售價</label>
                            <input type="number" placeholder='請輸入售價' className='form-control' id='price' value={selectedProduct.price} onChange={handleModalInputChange} min='0'/>
                            </div>
                            <div className="col-12 mb-3">
                            <label htmlFor="description" className='form-label'>商品描述</label>
                            <textarea type="text" placeholder='請輸入商品描述' className='form-control' id='description' value={selectedProduct.description} onChange={handleModalInputChange}/>
                            </div>
                            <div className="col-12 mb-3">
                            <label htmlFor="content" className='form-label'>商品內容</label>
                            <textarea type="text" placeholder='請輸入商品內容' className='form-control' id='content' value={selectedProduct.content} onChange={handleModalInputChange}/>
                            </div>
                            <div className="col-12 mb-3">
                            <label htmlFor="notice" className='form-label'>注意事項</label>
                            <textarea type="text" placeholder='請輸入注意事項' className='form-control' id='notice' value={selectedProduct.notice} onChange={handleModalInputChange}/>
                            </div>

                            <div className="col-12 mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value={selectedProduct.is_enabled} id="isEnabled" onChange={handleModalInputChange} />
                                <label className="form-check-label" htmlFor="isEnabled">
                                是否啟用
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                }
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>取消</button>
                {
                    modalType ==='delete' ? 
                    (<button type="button" className="btn btn-danger" onClick={()=>deleteProduct(selectedProduct.id)}>刪除</button>):
                    (<button type="button" className="btn btn-warning" onClick={()=>updateProduct(selectedProduct.id)}>確認</button>)
                }
                </div>
            </div>
            </div>
        </div>
    )
}

ProductModal.propTypes = {
    modalType: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    selectedProduct: PropTypes.object.isRequired,
    handleFileChange: PropTypes.func.isRequired,
    handleModalInputChange: PropTypes.func.isRequired,
    handleAddImage: PropTypes.func.isRequired,
    handleRemoveImage: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    productModalRef: PropTypes.object.isRequired,
};

export default ProductModal;