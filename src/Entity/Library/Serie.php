<?php
namespace App\Entity\Library;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource
 * @ORM\Entity
 */
class Serie
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=512, nullable=false)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Library\Book", mappedBy="serie", orphanRemoval=true)
     * @ApiSubresource(maxDepth=1)
     */
    private $book;

    /**
     * Serie constructor.
     */
    public function __construct()
    {
        $this->book = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return Serie
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getBook()
    {
        return $this->book;
    }
}
