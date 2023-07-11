### laravel框架关联表 一对多

```php
/*
 * 关联表 一对多
 * has_one（或has_many）:外键在子关联对象中
 *
 * belongsto 外键在你父联对象中

 */public function Cshangdetail()

    return $this->hasOne('Cshangdetail',  'user_id','id');
}
```
解读:has_one（或has_many）      user_id 和 前面 类名不一样，
belongsto    user_id 和 前面 类名一样，
