<?php

namespace AppBundle\Controller\Activity;

use AppBundle\Common\ArrayToolkit;
use AppBundle\Common\Paginator;
use AppBundle\Controller\BaseController;
use Biz\Visualization\Service\ActivityDataDailyStatisticsService;
use Symfony\Component\HttpFoundation\Request;

class BaseActivityController extends BaseController
{
    public function learnDataDetailAction(Request $request, $task)
    {
        $conditions = [
            'courseTaskId' => $task['id'],
        ];

        $paginator = new Paginator(
            $request,
            $this->getTaskResultService()->countTaskResults($conditions),
            20
        );

        $taskResults = $this->getTaskResultService()->searchTaskResults(
            $conditions,
            ['createdTime' => 'ASC'],
            $paginator->getOffsetCount(),
            $paginator->getPerPageCount()
        );

        $userIds = ArrayToolkit::column($taskResults, 'userId');
        $users = $this->getUserService()->findUsersByIds($userIds);

        return $this->render('activity/other-learn-data-detail-modal.html.twig', [
            'task' => $task,
            'taskResults' => $taskResults,
            'users' => $users,
            'paginator' => $paginator,
            'videoEffectiveTimeStatistics' => $this->getActivityDataDailyStatisticsService()->getVideoEffectiveTimeStatisticsSetting(),
        ]);
    }

    protected function getTaskResultService()
    {
        return $this->createService('Task:TaskResultService');
    }

    protected function getUserService()
    {
        return $this->createService('User:UserService');
    }

    /**
     * @return ActivityDataDailyStatisticsService
     */
    protected function getActivityDataDailyStatisticsService()
    {
        return $this->createService('Visualization:ActivityDataDailyStatisticsService');
    }
}
