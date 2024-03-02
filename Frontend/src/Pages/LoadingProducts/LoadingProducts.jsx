import { Skeleton } from "antd";


const LoadingProducts = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 m-5 justify-center items-center gap-x-0 gap-y-5 md:gap-5 ">

            {/* skeleton 1 */}

            <div className=" max-w-xs bg-gray-300 px-3 py-5 rounded-lg">
                <div className="mx-auto text-center my-2">
                    <Skeleton.Image active={true} size='large' />
                </div>
                <Skeleton.Input active={true} size={'small'} block={true} className="mt-2" />
                <span className="flex justify-between mt-3">
                    <Skeleton.Button active={true} size={'small'} />
                    <Skeleton.Input active={true} size={'small'} />
                </span>
                <Skeleton.Input active={true} size={'large'} block={true} className="mt-2" />
            </div>
            
            {/* skeleton 2 */}

            <div className=" max-w-xs bg-gray-300 px-3 py-5 rounded-lg">
                <div className="mx-auto text-center my-2">
                    <Skeleton.Image active={true} size='large' />
                </div>
                <Skeleton.Input active={true} size={'small'} block={true} className="mt-2" />
                <span className="flex justify-between mt-3">
                    <Skeleton.Button active={true} size={'small'} />
                    <Skeleton.Input active={true} size={'small'} />
                </span>
                <Skeleton.Input active={true} size={'large'} block={true} className="mt-2" />
            </div>

            {/* skeleton 3 */}

            <div className=" max-w-xs bg-gray-300 px-3 py-5 rounded-lg">
                <div className="mx-auto text-center my-2">
                    <Skeleton.Image active={true} size='large' />
                </div>
                <Skeleton.Input active={true} size={'small'} block={true} className="mt-2" />
                <span className="flex justify-between mt-3">
                    <Skeleton.Button active={true} size={'small'} />
                    <Skeleton.Input active={true} size={'small'} />
                </span>
                <Skeleton.Input active={true} size={'large'} block={true} className="mt-2" />
            </div>

            {/* skeleton 4 */}

            <div className=" max-w-xs bg-gray-300 px-3 py-5 rounded-lg">
                <div className="mx-auto text-center my-2">
                    <Skeleton.Image active={true} size='large' />
                </div>
                <Skeleton.Input active={true} size={'small'} block={true} className="mt-2" />
                <span className="flex justify-between mt-3">
                    <Skeleton.Button active={true} size={'small'} />
                    <Skeleton.Input active={true} size={'small'} />
                </span>
                <Skeleton.Input active={true} size={'large'} block={true} className="mt-2" />
            </div>

        </div>
    );
};

export default LoadingProducts;