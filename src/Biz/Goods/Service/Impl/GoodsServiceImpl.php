<?php

namespace Biz\Goods\Service\Impl;

use AppBundle\Common\ArrayToolkit;
use Biz\BaseService;
use Biz\Common\CommonException;
use Biz\Goods\Dao\GoodsDao;
use Biz\Goods\Dao\GoodsSpecsDao;
use Biz\Goods\GoodsException;
use Biz\Goods\Service\GoodsService;

class GoodsServiceImpl extends BaseService implements GoodsService
{
    public function getGoods($id)
    {
        return $this->getGoodsDao()->get($id);
    }

    public function createGoods($goods)
    {
        if (!ArrayToolkit::requireds($goods, ['productId', 'title'])) {
            $this->createNewException(CommonException::ERROR_PARAMETER_MISSING());
        }

        $goods = ArrayToolkit::parts($goods, [
            'productId',
            'title',
            'subtitle',
            'summary',
            'orgId',
            'orgCode',
            'images',
            'creator',
            'minPrice',
            'maxPrice',
        ]);

        return $this->getGoodsDao()->create($goods);
    }

    public function publishGoods($id)
    {
        return $this->getGoodsDao()->create();
    }

    public function updateGoods($id, $goods)
    {
        $goods = ArrayToolkit::parts($goods, ['title', 'images']);

        return $this->getGoodsDao()->update($id, $goods);
    }

    public function deleteGoods($id)
    {
        return $this->getGoodsDao()->delete($id);
    }

    public function searchGoods($conditions, $orderBys, $start, $limit, $columns = [])
    {
        return $this->getGoodsDao()->search($conditions, $orderBys, $start, $limit, $columns);
    }

    public function getGoodsByProductId($productId)
    {
        return $this->getGoodsDao()->getByProductId($productId);
    }

    public function createGoodsSpecs($goodsSpecs)
    {
        if (!ArrayToolkit::requireds($goodsSpecs, ['goodsId', 'targetId', 'title'])) {
            $this->createNewException(CommonException::ERROR_PARAMETER_MISSING());
        }

        $goodsSpecs = ArrayToolkit::parts($goodsSpecs, ['goodsId', 'targetId', 'title', 'images', 'price']);

        return $this->getGoodsSpecsDao()->create($goodsSpecs);
    }

    public function getGoodsSpecs($id)
    {
        return $this->getGoodsSpecsDao()->get($id);
    }

    public function updateGoodsSpecs($id, $goodsSpecs)
    {
        $goodsSpecs = ArrayToolkit::parts($goodsSpecs, ['title', 'images', 'price']);

        return $this->getGoodsSpecsDao()->update($id, $goodsSpecs);
    }

    public function deleteGoodsSpecs($id)
    {
        return $this->getGoodsSpecsDao()->delete($id);
    }

    public function getGoodsSpecsByGoodsIdAndTargetId($goodsId, $targetId)
    {
        return $this->getGoodsSpecsDao()->getByGoodsIdAndTargetId($goodsId, $targetId);
    }

    public function findGoodsSpecsByGoodsId($goodsId)
    {
        return $this->getGoodsSpecsDao()->findByGoodsId($goodsId);
    }

    public function getGoodsSpecsByProductIdAndTargetId($productId, $targetId)
    {
        $goods = $this->getGoodsByProductId($productId);
        if (empty($goods)) {
            $this->createNewException(GoodsException::GOODS_NOT_FOUND());
        }

        return $this->getGoodsSpecsByGoodsIdAndTargetId($goods['id'], $targetId);
    }

    /**
     * @param $goods
     *
     * @return bool
     *              大于管理员的权限，教师权限且是当前商品的创建者
     *
     * @todo 按照当前逻辑课程后面设定的教师也应该有管理权限，从商品上，只有创建者有管理权限，后续作额外调整
     */
    public function canManageGoods($goods)
    {
        return $this->getCurrentUser()->isAdmin() || ($this->getCurrentUser()->isTeacher() && $this->isGoodsCreator($goods));
    }

    /**
     * @param $goods
     *
     * @return bool
     *              创建者Id不为空，且创建者Id等于当前用户Id
     */
    protected function isGoodsCreator($goods)
    {
        return $goods['creator'] && (int) $goods['creator'] === (int) $this->getCurrentUser()->getId();
    }

    /**
     * @return GoodsDao
     */
    protected function getGoodsDao()
    {
        return $this->createDao('Goods:GoodsDao');
    }

    /**
     * @return GoodsSpecsDao
     */
    protected function getGoodsSpecsDao()
    {
        return $this->createDao('Goods:GoodsSpecsDao');
    }
}
