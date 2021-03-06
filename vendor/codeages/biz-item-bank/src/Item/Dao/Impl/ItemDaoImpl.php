<?php

namespace Codeages\Biz\ItemBank\Item\Dao\Impl;

use Codeages\Biz\Framework\Dao\AdvancedDaoImpl;
use Codeages\Biz\ItemBank\Item\Dao\ItemDao;

class ItemDaoImpl extends AdvancedDaoImpl implements ItemDao
{
    protected $table = 'biz_item';

    public function findByIds($ids)
    {
        return $this->findInField('id', $ids);
    }

    public function findByCategoryIds($categoryIds)
    {
        return $this->findInField('category_id', $categoryIds);
    }

    public function getItemCountGroupByTypes($conditions)
    {
        $builder = $this->createQueryBuilder($conditions)
            ->select('count(id) as itemNum, type')
            ->addGroupBy('type');

        return $builder->execute()->fetchAll() ?: [];
    }

    public function countItemQuestionNumByBankId($bankId)
    {
        $sql = "SELECT count(*) FROM {$this->table} i INNER JOIN `biz_question` q ON i.id = q.item_id WHERE i.bank_id = ?;";
        return $this->db()->fetchColumn($sql, [$bankId]);
    }

    public function countItemQuestionNumByCategoryId($categoryId)
    {
        $sql = "SELECT count(*) FROM {$this->table} i INNER JOIN `biz_question` q ON i.id = q.item_id WHERE i.category_id = ?;";
        return $this->db()->fetchColumn($sql, [$categoryId]);
    }

    public function declares()
    {
        return [
            'timestamps' => [
                'created_time',
                'updated_time',
            ],
            'orderbys' => [
                'id',
                'created_time',
                'updated_time',
            ],
            'conditions' => [
                'type = :type',
                'id in (:ids)',
                'difficulty = :difficulty',
                'bank_id = :bank_id',
                'category_id = :category_id',
                'category_id in (:category_ids)',
                'material LIKE :material',
                'type in (:types)',
                'id not in (:exclude_ids)',
            ],
        ];
    }
}
