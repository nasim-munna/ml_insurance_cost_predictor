from django.db import models

# Create your models here.
class Insurance(models.Model):
    MALE = 1
    FEMALE = 0
    SEX_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female')
    )
    SOUTHEAST = 0
    SOUTHWEST = 1
    NORTHEAST = 2
    NORTHWEST = 3

    REGION_CHOICES = (
        (NORTHEAST,'Northeast'),
        (NORTHWEST,'Northwest'),
        (SOUTHEAST,'Southeast'),
        (SOUTHWEST,'Southwest'),
    )

    age = models.FloatField()
    sex = models.IntegerField(choices=SEX_CHOICES)
    bmi = models.FloatField()
    children = models.FloatField()
    smoker = models.IntegerField(choices=((0,'Smoker'),(1,'non-smoker')))
    region = models.IntegerField(choices=REGION_CHOICES)